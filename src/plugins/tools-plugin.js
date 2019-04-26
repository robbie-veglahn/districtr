import BrushTool from "../components/Toolbar/BrushTool";
import EraserTool from "../components/Toolbar/EraserTool";
import InspectTool from "../components/Toolbar/InspectTool";
import PanTool from "../components/Toolbar/PanTool";
import Brush from "../Map/Brush";
import { renderAboutModal } from "../components/Modal";
import { navigateTo } from "../routes";
import { html } from "lit-html";
import { download } from "../utils";

export default function ToolsPlugin(editor) {
    const { state, toolbar } = editor;
    const brush = new Brush(state.units, 20, 0);
    brush.on("colorfeature", state.update);
    brush.on("colorend", state.render);

    let tools = [
        new PanTool(),
        new BrushTool(brush, state.parts),
        new EraserTool(brush),
        new InspectTool(
            state.units,
            state.columnSets,
            state.nameColumn,
            state.unitsRecord,
            state.parts
        )
    ];

    for (let tool of tools) {
        toolbar.addTool(tool);
    }
    toolbar.selectTool("pan");
    toolbar.setMenuItems(getMenuItems(editor.state));
}

function exportPlanAsJSON(state) {
    const serialized = state.serialize();
    const text = JSON.stringify(serialized);
    download(`districtr-plan-${serialized.id}.json`, text);
}

// It's not a great design to have these non-tool items in the row of tool icons.
// TODO: Find a different UI for New/Save/Export-type actions.
function getMenuItems(state) {
    let items = [
        {
            render: () => html`
                <button
                    class="square-button"
                    @click="${() => renderAboutModal(state)}"
                >
                    About
                </button>
            `
        },
        {
            render: () => html`
                <button
                    class="square-button"
                    @click="${() => navigateTo("/new")}"
                >
                    New Plan
                </button>
            `
        },
        {
            render: () => html`
                <button
                    class="square-button"
                    @click="${() => exportPlanAsJSON(state)}"
                >
                    Export Plan
                </button>
            `
        }
    ];
    return items;
}
