import java.util.*;
class Solution {
    public int numIslands(char[][] grid) {
        int R = grid.length, C = grid[0].length; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz init
        int count = 0; // @viz init
        ArrayDeque<int[]> queue = new ArrayDeque<>(); // @viz init
        for (int r = 0; r < R; r++) { // @viz cell
            for (int c = 0; c < C; c++) { // @viz cell
                if (grid[r][c] != '1') continue; // @viz cell
                count++; // land not sunk yet: a new island // @viz start
                grid[r][c] = '0'; // sink a cell when it's queued, so it's never queued twice // @viz start
                queue.add(new int[] {r, c}); // @viz start
                while (!queue.isEmpty()) { // @viz pop
                    int[] cur = queue.poll(); // @viz pop
                    for (int d = 0; d < 4; d++) { // @viz push
                        int x = cur[0] + dr[d], y = cur[1] + dc[d]; // @viz push
                        if (x >= 0 && x < R && y >= 0 && y < C && grid[x][y] == '1') { // @viz push
                            grid[x][y] = '0'; // @viz push
                            queue.add(new int[] {x, y}); // @viz push
                        }
                    }
                }
            }
        }
        return count; // @viz return
    }
}
