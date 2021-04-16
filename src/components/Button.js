
import { html } from "lit-html";

/**
 * Creates a Button object which performs the action specified by ``onChange``.
 * @param {string} label Text inside the Button.
 * @param {string} hoverText Tooltip text to display when the Button is hovered
 * over.
 * @param {function(Event)} onClick Callback which consumes an Event.
 * @param {string|number} optionalID Number
 * @returns {TemplateResult}
 * @constructor
 */
export function Button(label, hoverText, onClick, optionalID = null) {
    return html`
        <label>
            <button
                class="button--alternate"
                title="${hoverText}"
                type="button" id="${optionalID}"
                @click="${e => onClick(e)}"
            >
                ${label}
            </button>
        </label>
    `;
}

export default Button;
