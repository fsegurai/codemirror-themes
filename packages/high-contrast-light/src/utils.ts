// Helper module for styling options
export const generalContent = {
  fontSize: '14px',
  fontFamily: 'JetBrains Mono, Consolas, monospace',
  lineHeight: '1.6',
};

export const generalCursor = {
  borderLeftWidth: '2px',
};

export const generalDiff = {
  insertedTextDecoration: 'none',
  deletedTextDecoration: 'line-through',
  insertedLinePadding: '1px 3px',
  borderRadious: '3px',
  ins_del_linePadding: '1px 3px',
};

export const generalGutter = {
  border: 'none',
  paddingRight: '8px',
  fontSize: '0.9em',
  fontWeight: '500',
  lineHeight: '1.78', // Adjusted to compensate for 0.9em fontSize (1.6 / 0.9 ≈ 1.78)
};

export const generalPanel = {
  border: 'none',
  borderRadius: '4px',
  padding: '2px 10px',
};

export const generalLine = {
  borderRadius: '2px',
};

export const generalMatching = {
  borderRadius: '2px',
};

export const generalPlaceholder = {
  borderRadius: '4px',
  padding: '0 5px',
  margin: '0 2px',
};

export const generalScroller = {
  width: '12px',
  height: '12px',
  borderRadius: '6px',
};

export const generalSearchField = {
  borderRadius: '4px',
  padding: '2px 6px',
};

export const generalTooltip = {
  borderRadius: '4px',
  borderRadiusSelected: '3px',
  lineHeight: '1.3',
  padding: '4px 8px',
  paddingRight: '8px',
};

//---------------------------------------

// Interface for merge revert styling options
export interface IMergeRevertStyles {
  backgroundColor: string
  borderColor: string
  buttonColor: string
  buttonHoverColor: string
}

/**
 * Function to apply merge revert styles for a theme
 * @param styles Styles for the merge revert buttons
 * @param styles.backgroundColor Background color of the revert area
 * @param styles.borderColor Border color of the revert area
 * @param styles.buttonColor Color of the revert buttons
 * @param styles.buttonHoverColor Hover color of the revert buttons
 */
export function applyMergeRevertStyles(styles: IMergeRevertStyles) {
  // Create a stylesheet
  const styleEl = document.createElement('style');
  styleEl.id = 'cm-merge-revert-styles';

  // Define CSS with the theme-specific values
  styleEl.textContent = `
    .cm-merge-revert {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 4px;
      background-color: ${styles.backgroundColor};
      border-left: 1px solid ${styles.borderColor};
      border-right: 1px solid ${styles.borderColor};
      width: 32px;
    }
    
    .cm-merge-revert button {
      width: 100%;
      height: auto;
      background-color: transparent;
      border: none;
      color: ${styles.buttonColor};
      cursor: pointer;
      margin: 0 auto;
      font-size: 20px;
    }
    
    .cm-merge-revert button:hover {
      background-color: ${styles.buttonHoverColor};
    }
  `;

  // Remove any existing merge styles
  const existingStyle = document.getElementById('cm-merge-revert-styles');
  if (existingStyle) existingStyle.remove();

  // Add the new styles
  document.head.appendChild(styleEl);
}
