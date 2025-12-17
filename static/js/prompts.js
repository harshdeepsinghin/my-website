/**
 * AI Prompt Library - Core JavaScript
 * Handles placeholder detection, form generation, and AI execution
 */

// AI Platform URLs
const AI_URLS = {
  chatgpt: 'https://chat.openai.com/?q=',
  perplexity: 'https://www.perplexity.ai/search?q=',
  gemini: 'https://gemini.google.com/app?q=',
  phind: 'https://www.phind.com/search?q='
};

// Placeholder regex pattern
const PLACEHOLDER_REGEX = /\{\{(\w+)\}\}/g;

/**
 * Extract unique placeholders from prompt text
 * @param {string} text - Raw prompt text
 * @returns {string[]} Array of unique placeholder names
 */
function extractPlaceholders(text) {
  const matches = text.matchAll(PLACEHOLDER_REGEX);
  const placeholders = new Set();
  for (const match of matches) {
    placeholders.add(match[1]);
  }
  return Array.from(placeholders);
}

/**
 * Determine input type based on placeholder name
 * @param {string} name - Placeholder name
 * @returns {object} Input type configuration
 */
function getInputType(name) {
  const lowerName = name.toLowerCase();

  // Number inputs for count/length related fields
  if (lowerName.includes('count') || lowerName.includes('length') ||
    lowerName.includes('number') || lowerName.includes('limit')) {
    return { type: 'number', min: 1 };
  }

  // Textarea for code or long content
  if (lowerName.includes('code') || lowerName.includes('content') ||
    lowerName.includes('text') || lowerName.includes('description')) {
    return { type: 'textarea' };
  }

  // Default to text input
  return { type: 'text' };
}

/**
 * Convert placeholder name to human-readable label
 * @param {string} name - Placeholder name (e.g., word_count)
 * @returns {string} Human-readable label (e.g., Word Count)
 */
function formatLabel(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Generate form inputs for all placeholders
 * @param {string[]} placeholders - Array of placeholder names
 * @param {HTMLElement} formElement - Form container element
 */
function generateFormInputs(placeholders, formElement) {
  formElement.innerHTML = '';

  placeholders.forEach(placeholder => {
    const inputConfig = getInputType(placeholder);
    const fieldId = `field-${placeholder}`;

    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'form-field';

    const label = document.createElement('label');
    label.htmlFor = fieldId;
    label.textContent = formatLabel(placeholder);

    let input;
    if (inputConfig.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 4;
    } else {
      input = document.createElement('input');
      input.type = inputConfig.type;
      if (inputConfig.min) input.min = inputConfig.min;
    }

    input.id = fieldId;
    input.name = placeholder;
    input.placeholder = `Enter ${formatLabel(placeholder).toLowerCase()}...`;
    input.className = 'form-input';

    // Update preview on input change
    input.addEventListener('input', updatePreview);

    fieldDiv.appendChild(label);
    fieldDiv.appendChild(input);
    formElement.appendChild(fieldDiv);
  });
}

/**
 * Highlight placeholders in the template display
 * @param {string} template - Raw prompt template
 * @returns {string} HTML with highlighted placeholders
 */
function highlightPlaceholders(template) {
  return template.replace(PLACEHOLDER_REGEX, '<span class="placeholder">{{$1}}</span>');
}

/**
 * Get current form values
 * @returns {object} Object with placeholder values
 */
function getFormValues() {
  const form = document.getElementById('prompt-form');
  const values = {};
  const inputs = form.querySelectorAll('.form-input');

  inputs.forEach(input => {
    values[input.name] = input.value;
  });

  return values;
}

/**
 * Replace placeholders with form values
 * @param {string} template - Raw prompt template
 * @param {object} values - Form values object
 * @returns {string} Filled prompt text
 */
function fillPrompt(template, values) {
  let filled = template;

  for (const [key, value] of Object.entries(values)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    filled = filled.replace(regex, value || `{{${key}}}`);
  }

  return filled;
}

/**
 * Replace placeholders with highlighted form values for preview
 * @param {string} template - Raw prompt template
 * @param {object} values - Form values object
 * @returns {string} Filled prompt with highlighted values
 */
function fillPromptWithHighlight(template, values) {
  let filled = template;

  for (const [key, value] of Object.entries(values)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    if (value && value.trim() !== '') {
      // Wrap filled values in a span for highlighting
      filled = filled.replace(regex, `<span class="filled-value">${escapeHtml(value)}</span>`);
    } else {
      // Keep unfilled placeholders with original highlighting
      filled = filled.replace(regex, `<span class="placeholder">{{${key}}}</span>`);
    }
  }

  return filled;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Update the preview section with current form values
 */
function updatePreview() {
  const rawPrompt = getRawPrompt();
  const values = getFormValues();
  const filledPrompt = fillPromptWithHighlight(rawPrompt, values);

  const previewElement = document.getElementById('prompt-preview');
  previewElement.innerHTML = filledPrompt;
}

/**
 * Get the raw prompt text from the hidden script tag
 * @returns {string} Raw prompt text
 */
function getRawPrompt() {
  const rawElement = document.getElementById('prompt-raw');
  return rawElement ? rawElement.textContent.trim() : '';
}

/**
 * Check if all form fields are filled
 * @returns {boolean} True if all fields have values
 */
function allFieldsFilled() {
  const values = getFormValues();
  return Object.values(values).every(v => v && v.trim() !== '');
}

/**
 * Get the final filled prompt (no placeholders remaining)
 * @returns {string} Final prompt text
 */
function getFinalPrompt() {
  const rawPrompt = getRawPrompt();
  const values = getFormValues();
  return fillPrompt(rawPrompt, values);
}

/**
 * Open AI platform with the filled prompt
 * @param {string} aiPlatform - AI platform key (chatgpt, perplexity, etc.)
 */
function executeWithAI(aiPlatform) {
  const baseUrl = AI_URLS[aiPlatform];
  if (!baseUrl) {
    console.error(`Unknown AI platform: ${aiPlatform}`);
    return;
  }

  if (!allFieldsFilled()) {
    alert('Please fill in all parameters before executing.');
    return;
  }

  const prompt = getFinalPrompt();
  const encodedPrompt = encodeURIComponent(prompt);
  const url = baseUrl + encodedPrompt;

  window.open(url, '_blank');
}

/**
 * Copy prompt to clipboard
 */
async function copyPrompt() {
  const prompt = getFinalPrompt();

  try {
    await navigator.clipboard.writeText(prompt);
    const btn = document.getElementById('copy-prompt');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  }
}

/**
 * Initialize the prompt page
 */
function initPromptPage() {
  const rawPrompt = getRawPrompt();
  if (!rawPrompt) return;

  // Extract placeholders
  const placeholders = extractPlaceholders(rawPrompt);

  // Generate form inputs
  const formElement = document.getElementById('prompt-form');
  if (formElement) {
    generateFormInputs(placeholders, formElement);
  }

  // Highlight placeholders in template display
  const templateElement = document.getElementById('prompt-template');
  if (templateElement) {
    templateElement.innerHTML = highlightPlaceholders(rawPrompt);
  }

  // Set up AI buttons
  const aiButtons = document.querySelectorAll('.ai-btn');
  aiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      executeWithAI(btn.dataset.ai);
    });
  });

  // Set up copy button
  const copyBtn = document.getElementById('copy-prompt');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyPrompt);
  }

  // Initial preview update
  updatePreview();
}
