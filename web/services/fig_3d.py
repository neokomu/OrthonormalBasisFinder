# 3d
import numpy as np
import plotly.graph_objects as go

def draw_3d(
    vectors: np.ndarray,
    is_plane,
    origin=(0, 0, 0),
    scale=1.0,
    color="black",
    v_name="vectors",
    is_line=True,
):  

    ox, oy, oz = origin
    fig = go.Figure()
    
    num_vecs = vectors.shape[1]
    
    # ---- origin point (small sphere) ----
    r = 0.1
    u = np.linspace(0, 2*np.pi, 20)
    v = np.linspace(0, np.pi, 20)

    U, V = np.meshgrid(u, v)

    X = r * np.cos(U) * np.sin(V)
    Y = r * np.sin(U) * np.sin(V)
    Z = r * np.cos(V)

    fig.add_trace(go.Scatter3d(
        x=[0], y=[0], z=[0],
        mode="markers",
        marker=dict(
            size=5,
            color="skyblue"
        ),
        name="Origin"
    ))

    # ===================== START: span lines =====================
    if is_line:
        for i in range(num_vecs):
            vx, vy, vz = vectors[:, i] * scale
            norm = np.linalg.norm([vx, vy, vz])

            # if norm < 1e-12:
            #     raise ValueError("Zero vector cannot span a line")

            t = np.linspace(-2, 2, 20)
            fig.add_trace(go.Scatter3d(
                x=ox + t * vx,
                y=oy + t * vy,
                z=oz + t * vz,
                mode="lines",
                opacity=0.3,
                line=dict(width=4),
                name=f"Span of Vector {i+1}"
            ))
    # ===================== END =====================

    # ===================== START: plane =====================
    if is_plane and num_vecs == 2:
        v1 = vectors[:, 0] * scale
        v2 = vectors[:, 1] * scale

        s = np.linspace(-2, 2, 20)
        t = np.linspace(-2, 2, 20)
        S, T = np.meshgrid(s, t)

        X = ox + S * v1[0] + T * v2[0]
        Y = oy + S * v1[1] + T * v2[1]
        Z = oz + S * v1[2] + T * v2[2]

        fig.add_trace(go.Surface(
            x=X,
            y=Y,
            z=Z,
            opacity=0.2,
            showscale=False,
            name="Spanned Plane"
        ))
    # ===================== END =====================

    # ---- draw vectors + arrowheads ----
    for i in range(num_vecs):
        vx, vy, vz = vectors[:, i] * scale

        # shaft
        fig.add_trace(go.Scatter3d(
            x=[ox, ox + vx],
            y=[oy, oy + vy],
            z=[oz, oz + vz],
            mode="lines",
            line=dict(width=6),
            name=f"Vector {i+1}"
        ))

        # arrowhead
        norm = np.linalg.norm([vx, vy, vz])
        if norm > 1e-12:
            nx, ny, nz = vx / norm, vy / norm, vz / norm
            fig.add_trace(go.Cone(
                x=[ox + vx],
                y=[oy + vy],
                z=[oz + vz],
                u=[nx],
                v=[ny],
                w=[nz],
                anchor="tail",
                sizemode="scaled",
                sizeref=0.2,
                showscale=False
            ))

    fig.update_layout(
        autosize=True,
        margin=dict(l=0, r=0, t=0, b=0),
        scene=dict(
            aspectmode="data"
        )
    )

    return fig




# def main():
#     vectors_1D = np.asarray([[0.6, 0.8, 0.3]]).T
#     vectors_2D = np.asarray([[0.6, 0.8, 0.6], [0.8000000000000004, -0.5999999999999995, 0.7]]).T
#     vectors_3D = np.asarray([[0.6, 0.8, 0.5], [0.8000000000000004, -0.5999999999999995, 0.2], [0.6666, 0.7666, 0.1]]).T
#     #vectors = [[1, -1, 0], [1, 0, -1]]
#     fig = draw_3d(vectors_3D, True)
#     fig.show()

# if __name__ == "__main__":
#     main()