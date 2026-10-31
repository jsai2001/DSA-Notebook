import java.util.ArrayDeque;
import java.util.Queue;

class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length, cols = grid[0].length; // @viz init
        Queue<int[]> queue = new ArrayDeque<>(); // @viz init
        int fresh = 0; // @viz init
        for (int r = 0; r < rows; r++) { // @viz init
            for (int c = 0; c < cols; c++) { // @viz init
                if (grid[r][c] == 2) queue.add(new int[] {r, c}); // every rotten orange starts at minute 0 // @viz init
                else if (grid[r][c] == 1) fresh++; // @viz init
            }
        }
        int minutes = 0; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1};
        while (!queue.isEmpty() && fresh > 0) { // stop as soon as nothing is fresh // @viz minute
            minutes++; // @viz minute
            for (int size = queue.size(); size > 0; size--) { // one BFS level = one minute // @viz minute
                int[] cell = queue.poll(); // @viz pop
                for (int k = 0; k < 4; k++) { // @viz look
                    int nr = cell[0] + dr[k], nc = cell[1] + dc[k]; // @viz look
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) { // @viz look
                        grid[nr][nc] = 2; // rot it now so it's never queued twice // @viz rot
                        fresh--; // @viz rot
                        queue.add(new int[] {nr, nc}); // @viz rot
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1; // @viz return
    }
}
