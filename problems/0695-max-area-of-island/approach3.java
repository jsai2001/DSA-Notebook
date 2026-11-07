import java.util.*;
class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int R = grid.length, C = grid[0].length; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz init
        int best = 0; // @viz init
        ArrayDeque<int[]> stack = new ArrayDeque<>(); // @viz init
        for (int r = 0; r < R; r++) { // @viz cell
            for (int c = 0; c < C; c++) { // @viz cell
                if (grid[r][c] == 0) continue; // @viz cell
                grid[r][c] = 0; // sink a cell when it's pushed, so it's never pushed twice // @viz start
                stack.push(new int[] {r, c}); // @viz start
                int size = 0; // @viz start
                while (!stack.isEmpty()) { // @viz pop
                    int[] cur = stack.pop(); // @viz pop
                    size++; // @viz pop
                    for (int d = 0; d < 4; d++) { // @viz push
                        int x = cur[0] + dr[d], y = cur[1] + dc[d]; // @viz push
                        if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] == 1) { // @viz push
                            grid[x][y] = 0; // @viz push
                            stack.push(new int[] {x, y}); // @viz push
                        }
                    }
                }
                best = Math.max(best, size); // @viz best
            }
        }
        return best; // @viz return
    }
}
