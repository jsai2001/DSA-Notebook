import java.util.*;
class Solution {
    private int m, n;
    private final int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
    private void climb(int[][] h, int i, int j, boolean[] seen) { // walk uphill from the ocean // @viz climb
        if (seen[i * n + j]) return; // @viz climb
        seen[i * n + j] = true; // @viz climb
        for (int d = 0; d < 4; d++) { // @viz climb
            int x = i + dr[d], y = j + dc[d]; // @viz climb
            if (x >= 0 && x < m && y >= 0 && y < n && h[x][y] >= h[i][j]) climb(h, x, y, seen); // @viz climb
        }
    }
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        m = heights.length; n = heights[0].length; // @viz init
        boolean[] pac = new boolean[m * n], atl = new boolean[m * n]; // cells whose water reaches each ocean // @viz init
        for (int c = 0; c < n; c++) { climb(heights, 0, c, pac); climb(heights, m - 1, c, atl); } // top: Pacific, bottom: Atlantic // @viz edges
        for (int r = 0; r < m; r++) { climb(heights, r, 0, pac); climb(heights, r, n - 1, atl); } // left: Pacific, right: Atlantic // @viz edges
        List<List<Integer>> ans = new ArrayList<>(); // @viz return
        for (int r = 0; r < m; r++) // @viz return
            for (int c = 0; c < n; c++) // @viz return
                if (pac[r * n + c] && atl[r * n + c]) ans.add(List.of(r, c)); // @viz return
        return ans; // @viz return
    }
}
