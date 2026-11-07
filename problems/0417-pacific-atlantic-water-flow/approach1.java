import java.util.*;
class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        int m = heights.length, n = heights[0].length; // @viz init
        List<List<Integer>> ans = new ArrayList<>(); // @viz init
        int[] seen = new int[m * n]; // seen[cell] = 1 + the start cell that reached it // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz init
        int[] stack = new int[m * n]; // @viz init
        for (int r = 0; r < m; r++) // from every cell, follow the water downhill // @viz cell
            for (int c = 0; c < n; c++) { // @viz cell
                boolean pac = false, atl = false; // @viz cell
                int id = r * n + c + 1, top = 0; // @viz cell
                stack[top++] = r * n + c; // @viz cell
                seen[r * n + c] = id; // @viz cell
                while (top > 0 && !(pac && atl)) { // @viz flow
                    int cell = stack[--top], i = cell / n, j = cell % n; // @viz flow
                    pac |= i == 0 || j == 0; // touches the top or left edge // @viz flow
                    atl |= i == m - 1 || j == n - 1; // touches the bottom or right edge // @viz flow
                    for (int d = 0; d < 4; d++) { // @viz flow
                        int x = i + dr[d], y = j + dc[d]; // @viz flow
                        if (x >= 0 && x < m && y >= 0 && y < n && seen[x * n + y] != id && heights[x][y] <= heights[i][j]) { // water flows to equal or lower // @viz flow
                            seen[x * n + y] = id; // @viz flow
                            stack[top++] = x * n + y; // @viz flow
                        }
                    }
                }
                if (pac && atl) ans.add(List.of(r, c)); // @viz both
            }
        return ans; // @viz return
    }
}
