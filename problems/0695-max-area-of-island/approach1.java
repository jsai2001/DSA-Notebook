import java.util.*;
class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int R = grid.length, C = grid[0].length; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz init
        int best = 0; // @viz init
        for (int r = 0; r < R; r++) { // @viz cell
            for (int c = 0; c < C; c++) { // @viz cell
                if (grid[r][c] == 0) continue; // @viz cell
                boolean[][] seen = new boolean[R][C]; // count this cell's island from scratch // @viz fill
                ArrayDeque<int[]> stack = new ArrayDeque<>(); // @viz fill
                stack.push(new int[] {r, c}); // @viz fill
                seen[r][c] = true; // @viz fill
                int size = 1; // @viz fill
                while (!stack.isEmpty()) { // @viz fill
                    int[] cur = stack.pop(); // @viz fill
                    for (int d = 0; d < 4; d++) { // @viz fill
                        int x = cur[0] + dr[d], y = cur[1] + dc[d]; // @viz fill
                        if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] == 1 && !seen[x][y]) { // @viz fill
                            seen[x][y] = true; // @viz fill
                            size++; // @viz fill
                            stack.push(new int[] {x, y}); // @viz fill
                        }
                    }
                }
                best = Math.max(best, size); // @viz best
            }
        }
        return best; // @viz return
    }
}
