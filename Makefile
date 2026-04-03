# ---------- Config ----------
TRIVY_IMAGE = aquasec/trivy
TRIVY_CACHE = $(HOME)/.trivy
TARGET ?= .                         # default folder to scan
REPORT_DIR = $(PWD)/trivy-reports

# ---------- Ensure report directory exists ----------
$(shell mkdir -p $(REPORT_DIR))

# ---------- Helper for safe base name ----------
# Normalize trailing slashes and map current-directory targets to project folder name.
NORMALIZED_TARGET := $(patsubst %/,%,$(strip $(TARGET)))
BASE_NAME := $(notdir $(NORMALIZED_TARGET))
ifeq ($(BASE_NAME),)
BASE_NAME := $(notdir $(CURDIR))
endif
ifeq ($(BASE_NAME),.)
BASE_NAME := $(notdir $(CURDIR))
endif

# ---------- Scans ----------
# Basic scan (vulnerabilities only)
trivy:
	docker run --rm \
		-v $(PWD):/app \
		-v $(TRIVY_CACHE):/root/.cache/trivy \
		$(TRIVY_IMAGE) fs --scanners vuln /app/$(TARGET)

# Faster scan (skip secrets)
trivy-fast:
	docker run --rm \
		-v $(PWD):/app \
		-v $(TRIVY_CACHE):/root/.cache/trivy \
		$(TRIVY_IMAGE) fs \
		--scanners vuln,secret,misconfig \
		--include-dev-deps \
		/app/$(TARGET)

# Full scan with all scanners, outputs JSON & SARIF
trivy-full:
	@mkdir -p $(REPORT_DIR)
	@echo "Scanning $(TARGET)..."
	# JSON report
	docker run --rm \
		-v $(PWD):/app \
		-v $(TRIVY_CACHE):/root/.cache/trivy \
		$(TRIVY_IMAGE) fs \
		--scanners license,vuln,secret,misconfig \
		--include-dev-deps \
		-f json -o /app/trivy-reports/trivy-$(BASE_NAME).json \
		/app/$(TARGET)
	# SARIF report
	docker run --rm \
		-v $(PWD):/app \
		-v $(TRIVY_CACHE):/root/.cache/trivy \
		$(TRIVY_IMAGE) fs \
		--scanners license,vuln,secret,misconfig \
		--include-dev-deps \
		-f sarif -o /app/trivy-reports/trivy-$(BASE_NAME).sarif \
		/app/$(TARGET)
	@echo "Reports saved in $(REPORT_DIR)"

# CI-friendly scan: fails if vulnerabilities found
trivy-ci:
	docker run --rm \
		-v $(PWD):/app \
		-v $(TRIVY_CACHE):/root/.cache/trivy \
		$(TRIVY_IMAGE) fs \
		--scanners vuln,misconfig \
		--exit-code 1 /app/$(TARGET)

# ---------- Help ----------
help:
	@echo "Usage: make <target> [TARGET=folder]"
	@echo ""
	@echo "Targets:"
	@echo "  trivy        - basic scan (vulnerabilities only)"
	@echo "  trivy-fast   - fast scan (vuln + misconfig, skip secrets)"
	@echo "  trivy-full   - full scan (license, vuln, secret, misconfig) + JSON/SARIF reports"
	@echo "  trivy-ci     - CI scan (exit code 1 if vulnerabilities found)"
	@echo ""
	@echo "Optional:"
	@echo "  TARGET=folder - specify folder to scan (default: current folder)"
