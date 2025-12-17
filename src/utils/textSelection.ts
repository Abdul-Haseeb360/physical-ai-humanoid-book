/**
 * Utility functions for text selection handling in the RAG chatbot
 */

/**
 * Gets the currently selected text in the document
 * @returns The selected text as a string, or null if no text is selected
 */
export const getSelectedText = (): string | null => {
  const selection = window.getSelection();
  if (!selection) {
    return null;
  }

  // Get the selected text and trim whitespace
  const selectedText = selection.toString().trim();

  // Return null if no text is selected
  return selectedText.length > 0 ? selectedText : null;
};

/**
 * Gets information about the current text selection
 * @returns Selection information including text, start/end positions, and selected element
 */
export const getTextSelectionInfo = () => {
  const selection = window.getSelection();

  if (!selection || selection.toString().trim().length === 0) {
    return null;
  }

  const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  if (!range) {
    return {
      text: selection.toString(),
      rect: null,
      element: null
    };
  }

  const rect = range.getBoundingClientRect();
  const element = range.startContainer.parentElement;

  return {
    text: selection.toString().trim(),
    rect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      bottom: rect.bottom,
      right: rect.right
    },
    element: element,
    startOffset: range.startOffset,
    endOffset: range.endOffset
  };
};

/**
 * Adds event listeners for text selection
 * @param callback Function to call when text selection changes
 * @returns Function to remove the event listeners
 */
export const subscribeToTextSelection = (callback: (selectionInfo: ReturnType<typeof getTextSelectionInfo> | null) => void) => {
  const handleSelectionChange = () => {
    const selectionInfo = getTextSelectionInfo();
    callback(selectionInfo);
  };

  // Add event listeners for different selection change scenarios
  document.addEventListener('mouseup', handleSelectionChange);
  document.addEventListener('keyup', handleSelectionChange);
  document.addEventListener('selectionchange', handleSelectionChange);

  // Return cleanup function
  return () => {
    document.removeEventListener('mouseup', handleSelectionChange);
    document.removeEventListener('keyup', handleSelectionChange);
    document.removeEventListener('selectionchange', handleSelectionChange);
  };
};

/**
 * Highlights selected text temporarily (for UI feedback)
 * @param className CSS class name to apply to the selection highlight
 * @returns Function to remove the highlighting
 */
export const highlightSelectedText = (className: string = 'chatbot-selection-highlight') => {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return () => {}; // Return no-op function if nothing to highlight
  }

  const ranges: Range[] = [];
  const highlights: HTMLElement[] = [];

  // Collect all ranges in the selection
  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    if (range) {
      ranges.push(range.cloneRange());
    }
  }

  // Create highlight spans for each range
  ranges.forEach(range => {
    const highlightSpan = document.createElement('span');
    highlightSpan.classList.add(className);

    // Apply inline styles for highlighting
    highlightSpan.style.backgroundColor = 'rgba(255, 223, 0, 0.3)';
    highlightSpan.style.borderRadius = '2px';

    try {
      range.surroundContents(highlightSpan);
      highlights.push(highlightSpan);
    } catch (e) {
      // If surroundContents fails (e.g., partially selected nodes), handle gracefully
      const contents = range.extractContents();
      highlightSpan.appendChild(contents);
      range.insertNode(highlightSpan);
      highlights.push(highlightSpan);
    }
  });

  // Return cleanup function to remove highlights
  return () => {
    highlights.forEach(highlight => {
      if (highlight.parentNode) {
        const parent = highlight.parentNode;
        const children = Array.from(highlight.childNodes);

        // Move child nodes back to parent
        children.forEach(child => parent.insertBefore(child, highlight));

        // Remove the highlight span
        parent.removeChild(highlight);
      }
    });
  };
};

/**
 * Gets the current page context (URL, title) along with selected text
 * @returns Object containing selected text and page context
 */
export const getSelectedTextWithContext = () => {
  const selectedText = getSelectedText();

  return {
    selectedText: selectedText,
    currentPageUrl: window.location.href,
    currentPageTitle: document.title,
    selectionTimestamp: new Date().toISOString()
  };
};