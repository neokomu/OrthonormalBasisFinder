import plotly.graph_objects as go

fig = go.Figure()

# Vector from (0,0) to (3,2)
fig.add_trace(go.Scatter(
    x=[0, 3],
    y=[0, 2],
    mode="lines+markers",
    marker=dict(
        size=10,
        symbol="arrow"
    ),
    line=dict(width=2),
    name="Vector"
))

fig.update_layout(
    xaxis=dict(scaleanchor="y"),
    title="2D Vector Arrow"
)

fig.show()