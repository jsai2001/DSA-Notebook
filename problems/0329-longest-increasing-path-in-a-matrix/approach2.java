import java.util.*;
class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        int R = matrix.length, C = matrix[0].length; // @viz init
        int[] dr = {1, -1, 0, 0}, dc = {0, 0, 1, -1}; // @viz init
        int[][] bigger = new int[R][C]; // how many neighbours are bigger // @viz count
        List<int[]> layer = new ArrayList<>(); // @viz count
        for (int r = 0; r < R; r++) // @viz count
            for (int c = 0; c < C; c++) { // @viz count
                for (int d = 0; d < 4; d++) { // @viz count
                    int x = r + dr[d], y = c + dc[d]; // @viz count
                    if (x >= 0 && x < R && y >= 0 && y < C && matrix[x][y] > matrix[r][c]) bigger[r][c]++; // @viz count
                }
                if (bigger[r][c] == 0) layer.add(new int[] {r, c}); // local peaks: every path ends at one // @viz count
            }
        int length = 0; // @viz init
        while (!layer.isEmpty()) { // peel the matrix from the peaks down, one layer per step of the path // @viz peel
            length++; // @viz peel
            List<int[]> next = new ArrayList<>(); // @viz peel
            for (int[] cell : layer) // @viz peel
                for (int d = 0; d < 4; d++) { // @viz drop
                    int x = cell[0] + dr[d], y = cell[1] + dc[d]; // @viz drop
                    if (x >= 0 && x < R && y >= 0 && y < C && matrix[x][y] < matrix[cell[0]][cell[1]] && --bigger[x][y] == 0) // a smaller neighbour loses one bigger neighbour // @viz drop
                        next.add(new int[] {x, y}); // all its bigger neighbours are peeled: it's in the next layer // @viz drop
                }
            layer = next; // @viz peel
        }
        return length; // the number of layers = the longest path // @viz return
    }
}
