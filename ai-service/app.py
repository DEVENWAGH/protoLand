# pyrefly: ignore [missing-import]
import gradio as gr
from main import app as fastapi_app
from qualification.scoring import EvidenceQualificationEngine
from rag.vector_search import MockVectorSearchEngine

# Initialize vector search engine
vector_engine = MockVectorSearchEngine()

def run_qualification(title, pub_year, source, target_region, applied_state):
    result = EvidenceQualificationEngine.evaluate(
        pub_year=int(pub_year),
        source=source,
        target_region=target_region,
        applied_state=applied_state
    )
    return result

def run_semantic_search(query, top_k):
    results = vector_engine.query(query, top_k=int(top_k))
    return results

# Build interactive Gradio web portal
with gr.Blocks(title="VISION AI Intelligence Portal", theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 🏛️ VISION: National Land Governance & Evidence Intelligence Platform")
    gr.Markdown(
        "**Smart India Hackathon 2026** • PS ID: 26019 • AI Research & Policy Evidence Engine\n\n"
        "🔗 **Interactive REST API (Swagger Docs):** [View `/docs`](/docs) | [View `/openapi.json`](/openapi.json)"
    )

    with gr.Tab("🎯 Evidence Qualification Engine"):
        gr.Markdown("### Calculate multi-factor trust qualification scores for empirical research.")
        with gr.Row():
            with gr.Column():
                q_title = gr.Textbox(label="Evidence / Paper Title", value="Drone Cadastral Survey Accuracy in Vidarbha Agricultural Parcels")
                q_year = gr.Number(label="Publication Year", value=2024, precision=0)
                q_source = gr.Dropdown(
                    choices=["Peer-Reviewed Journal", "Government Gazette", "MoRD / DILRMP Working Paper", "Conference Proceedings", "Whitepaper / Pre-print"],
                    value="Peer-Reviewed Journal",
                    label="Publication Source"
                )
                q_region = gr.Textbox(label="Geographic Study Region", value="Nagpur, Maharashtra")
                q_state = gr.Textbox(label="Target Jurisdiction State", value="Maharashtra")
                qualify_btn = gr.Button("Evaluate Qualification Score", variant="primary")
            with gr.Column():
                qualify_output = gr.JSON(label="Multi-Factor Evaluation Breakdown")

        qualify_btn.click(
            run_qualification,
            inputs=[q_title, q_year, q_source, q_region, q_state],
            outputs=qualify_output
        )

    with gr.Tab("🔍 Semantic Vector Search"):
        gr.Markdown("### Query the semantic evidence vector repository (PostGIS / pgvector).")
        with gr.Row():
            with gr.Column():
                search_query = gr.Textbox(label="Search Query", value="land boundary demarcation drone accuracy Maharashtra")
                top_k = gr.Slider(minimum=1, maximum=10, value=3, step=1, label="Top K Matches")
                search_btn = gr.Button("Search Vector Database", variant="primary")
            with gr.Column():
                search_output = gr.JSON(label="Retrieved Evidence Matches")

        search_btn.click(
            run_semantic_search,
            inputs=[search_query, top_k],
            outputs=search_output
        )

# Mount Gradio app into FastAPI so all REST API endpoints (/api/v1/...) work simultaneously!
app = gr.mount_gradio_app(fastapi_app, demo, path="/")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
