class Solution {
    private int[][] g;
    public int longestIncreasingPath(int[][] matrix) {
        g = matrix; // @viz init
        int ans = 0; // @viz return
        for (int r = 0; r < g.length; r++) // @viz return
            for (int c = 0; c < g[0].length; c++) ans = Math.max(ans, longest(r, c)); // @viz return
        return ans; // @viz return
    }
    private int longest(int r, int c) { // the longest increasing path starting here, worked out from scratch each time // @viz call
        int best = 1; // @viz call
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz step
        for (int d = 0; d < 4; d++) { // @viz step
            int x = r + dr[d], y = c + dc[d]; // @viz step
            if (x >= 0 && x < g.length && y >= 0 && y < g[0].length && g[x][y] > g[r][c]) best = Math.max(best, 1 + longest(x, y)); // @viz step
        }
        return best; // @viz call
    }
}
