# 2d 
import numpy as np 
import plotly.graph_objects as go

def draw_2d(
    vectors: np.ndarray,
    origin=(0, 0),
    scale=1.0,
    color="black",
    v_name="vectors",
    is_line=True,
):
    fig = go.Figure()
    ox, oy = origin

    # origin
    fig.add_trace(go.Scatter(
        x=[ox],
        y=[oy],
        mode="markers",
        marker=dict(size=10),
        name="Origin"
    ))

    num_vecs = vectors.shape[1]
    # ---- draw vectors ----
    for i in range(num_vecs):
        vx, vy = vectors[:, i] * scale

        if is_line:
            norm = np.linalg.norm([vx, vy])

            # if norm < 1e-12:
            #     raise ValueError("Zero vector cannot span a line")

            radius = max(1.5 * norm, 1.0)
            t_max = radius / norm

            fig.add_trace(go.Scatter(
                x=[ox - t_max * vx, ox + t_max * vx],
                y=[oy - t_max * vy, oy + t_max * vy],
                mode="lines",
                opacity=0.3,
                line=dict(width=2),
                name=f"Span of Vector {i + 1}"
            ))

        fig.add_trace(go.Scatter(
            x=[ox, ox + vx],
            y=[oy, oy + vy],
            mode="lines",
            name=f"Vector {i + 1}"
        ))

        fig.add_annotation(
            x=ox + vx,
            y=oy + vy,
            ax=ox,
            ay=oy,
            xref="x",
            yref="y",
            axref="x",
            ayref="y",
            showarrow=True,
            arrowhead=2,
            arrowsize=1,
            arrowwidth=2,
        )

    # ===== START PARALLELOGRAM + SUM ANNOTATION ADDITION =====
    if num_vecs == 2:
        v1x, v1y = vectors[:, 0] * scale
        v2x, v2y = vectors[:, 1] * scale

        sx, sy = ox + v1x + v2x, oy + v1y + v2y  # vector sum

        # # hi gesti im leaving this to u as an option :D, its broken lines, if u delete the add_arrow annotation sa baba u can see it fully <333
        # fig.add_trace(go.Scatter(
        #     x=[ox + v1x, sx],
        #     y=[oy + v1y, sy],
        #     mode="lines",
        #     line=dict(dash="dash"),
        #     opacity=0.5,
        #     name="v1 → v1+v2"
        # ))

        # fig.add_trace(go.Scatter(
        #     x=[ox + v2x, sx],
        #     y=[oy + v2y, sy],
        #     mode="lines",
        #     line=dict(dash="dash"),
        #     opacity=0.5,
        #     name="v2 → v1+v2"
        # ))

        # low-opacity arrow annotations showing addition
        fig.add_annotation(
                x=sx,
                y=sy,
                ax=ox + v1x,
                ay=oy + v1y,
                xref="x",
                yref="y",
                axref="x",
                ayref="y",
                showarrow=True,
                arrowhead=2,
                arrowwidth=2,
                arrowcolor="rgba(0,0,0,0.4)"  # transparency here
        )

        fig.add_annotation(
                x=sx,
                y=sy,
                ax=ox + v2x,
                ay=oy + v2y,
                xref="x",
                yref="y",
                axref="x",
                ayref="y",
                showarrow=True,
                arrowhead=2,
                arrowwidth=2,
                arrowcolor="rgba(0,0,0,0.4)"  # transparency here
        )

        fig.add_annotation(
            x=sx, y=sy,
            ax=ox + v2x, ay=oy + v2y,
            showarrow=True,
            arrowhead=2,
            arrowwidth=2,
        )

        # point at the vector sum
        fig.add_trace(go.Scatter(
            x=[sx],
            y=[sy],
            mode="markers",
            marker=dict(size=8),
            name="Vector 1 + Vector 2"
        ))
    # ===== END PARALLELOGRAM + SUM ANNOTATION ADDITION =====

    fig.update_layout(
        autosize=True,
        margin=dict(l=0, r=0, t=0, b=0),
        xaxis=dict(scaleanchor="y"),
        yaxis=dict(scaleanchor="x")
    )

    return fig

# def main():
#     vectors_1D = np.asarray([[0.6, 0.8]]).T
#     vectors_2D = np.asarray([[0.6, 0.8], [0.8000000000000004, -0.5999999999999995]]).T
#     vectors_3D = np.asarray([[0.6, 0.8], [0.8000000000000004, -0.5999999999999995], [0.6666, 0.7666]]).T
#     #vectors = [[1, -1, 0], [1, 0, -1]]
#     fig = draw_2d(vectors_3D)
#     fig.show()

# if __name__ == "__main__":
#     main()