import java.util.*;

class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length; // @viz init
        List<int[]> trapped = new ArrayList<>(); // @viz init
        for (int r = 0; r < m; r++) { // @viz loop
            for (int c = 0; c < n; c++) { // @viz loop
                if (board[r][c] == 'O' && !escapes(board, r, c)) { // @viz loop
                    trapped.add(new int[] {r, c}); // @viz trapped
                }
            }
        }
        for (int[] cell : trapped) { // flip after all the checks // @viz flip
            board[cell[0]][cell[1]] = 'X'; // @viz flip
        }
    }

    // Can this O reach the border through other O's? A fresh search for every cell.
    private static boolean escapes(char[][] board, int r, int c) {
        int m = board.length, n = board[0].length;
        boolean[][] seen = new boolean[m][n]; // @viz search
        ArrayDeque<int[]> stack = new ArrayDeque<>(); // @viz search
        stack.push(new int[] {r, c}); // @viz search
        seen[r][c] = true; // @viz search
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!stack.isEmpty()) { // @viz search
            int[] cur = stack.pop(); // @viz search
            int i = cur[0], j = cur[1]; // @viz search
            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) { // @viz border
                return true; // @viz border
            }
            for (int[] d : dirs) { // @viz search
                int a = i + d[0], b = j + d[1]; // @viz search
                if (board[a][b] == 'O' && !seen[a][b]) { // @viz search
                    seen[a][b] = true; // @viz search
                    stack.push(new int[] {a, b}); // @viz search
                }
            }
        }
        return false; // @viz trapped
    }
}
