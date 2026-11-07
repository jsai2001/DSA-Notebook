import java.util.*;
class Solution {
    private boolean[] reach(int[][] h, int[] q, int size) { // every cell that drains into the first size cells of q // @viz init
        int m = h.length, n = h[0].length; // @viz seed
        boolean[] seen = new boolean[m * n]; // @viz seed
        for (int k = 0; k < size; k++) seen[q[k]] = true; // @viz seed
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz seed
        for (int k = 0; k < size; k++) { // BFS uphill: water flows back down the same way // @viz bfs
            int i = q[k] / n, j = q[k] % n; // @viz bfs
            for (int d = 0; d < 4; d++) { // @viz bfs
                int x = i + dr[d], y = j + dc[d]; // @viz bfs
                if (x >= 0 && x < m && y >= 0 && y < n && !seen[x * n + y] && h[x][y] >= h[i][j]) { // @viz bfs
                    seen[x * n + y] = true; // @viz bfs
                    q[size++] = x * n + y; // @viz bfs
                }
            }
        }
        return seen; // @viz bfs
    }
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int m = heights.length, n = heights[0].length; // @viz init
        int[] p = new int[m * n + m + n], a = new int[m * n + m + n]; // queues; a corner cell is listed twice // @viz seed
        int ps = 0, as = 0; // @viz seed
        for (int c = 0; c < n; c++) { p[ps++] = c; a[as++] = (m - 1) * n + c; } // top: Pacific, bottom: Atlantic // @viz seed
        for (int r = 0; r < m; r++) { p[ps++] = r * n; a[as++] = r * n + n - 1; } // left: Pacific, right: Atlantic // @viz seed
        boolean[] pac = reach(heights, p, ps), atl = reach(heights, a, as); // @viz seed
        List<List<Integer>> ans = new ArrayList<>(); // @viz return
        for (int r = 0; r < m; r++) // @viz return
            for (int c = 0; c < n; c++) // @viz return
                if (pac[r * n + c] && atl[r * n + c]) ans.add(List.of(r, c)); // @viz return
        return ans; // @viz return
    }
}
