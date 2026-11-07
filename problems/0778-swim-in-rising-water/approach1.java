import java.util.*;
class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length; // @viz init
        int lo = grid[0][0], hi = n * n - 1; // the answer is somewhere in here // @viz init
        while (lo < hi) { // find the smallest t that works // @viz search
            int mid = (lo + hi) / 2; // @viz search
            if (can(grid, mid)) hi = mid; // works: maybe something smaller does too // @viz yes
            else lo = mid + 1; // too early // @viz no
        }
        return lo; // @viz return
    }
    private boolean can(int[][] grid, int t) { // at time t, can you reach the far corner using only cells <= t? // @viz test
        int n = grid.length; // @viz test
        if (grid[0][0] > t) return false; // @viz test
        boolean[][] seen = new boolean[n][n]; // @viz test
        ArrayDeque<int[]> stack = new ArrayDeque<>(); // @viz test
        stack.push(new int[] {0, 0}); // @viz test
        seen[0][0] = true; // @viz test
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz test
        while (!stack.isEmpty()) { // @viz test
            int[] cur = stack.pop(); // @viz test
            if (cur[0] == n - 1 && cur[1] == n - 1) return true; // @viz test
            for (int d = 0; d < 4; d++) { // @viz test
                int x = cur[0] + dr[d], y = cur[1] + dc[d]; // @viz test
                if (x >= 0 && x < n && y >= 0 && y < n && !seen[x][y] && grid[x][y] <= t) { // @viz test
                    seen[x][y] = true; // @viz test
                    stack.push(new int[] {x, y}); // @viz test
                }
            }
        }
        return false; // @viz test
    }
}
