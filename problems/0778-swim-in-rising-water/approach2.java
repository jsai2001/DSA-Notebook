import java.util.*;
class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length; // @viz init
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]); // (the highest cell on the way here, r, c), lowest first // @viz init
        boolean[][] seen = new boolean[n][n]; // @viz init
        heap.add(new int[] {grid[0][0], 0, 0}); // @viz init
        seen[0][0] = true; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz init
        while (true) { // @viz pop
            int[] top = heap.poll(); // the cell reachable soonest // @viz pop
            int t = top[0], r = top[1], c = top[2]; // @viz pop
            if (r == n - 1 && c == n - 1) return t; // @viz done
            for (int d = 0; d < 4; d++) { // @viz push
                int x = r + dr[d], y = c + dc[d]; // @viz push
                if (x >= 0 && x < n && y >= 0 && y < n && !seen[x][y]) { // @viz push
                    seen[x][y] = true; // @viz push
                    heap.add(new int[] {Math.max(t, grid[x][y]), x, y}); // you wait for the higher of the path and the cell // @viz push
                }
            }
        }
    }
}
