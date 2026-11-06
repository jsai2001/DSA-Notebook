import java.util.*;

class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length; // @viz init
        ArrayDeque<int[]> queue = new ArrayDeque<>(); // @viz init
        for (int r = 0; r < m; r++) { // @viz seed
            for (int c = 0; c < n; c++) { // @viz seed
                if ((r == 0 || r == m - 1 || c == 0 || c == n - 1) && board[r][c] == 'O') { // @viz seed
                    board[r][c] = 'S'; // safe: it touches the border // @viz seed
                    queue.add(new int[] {r, c}); // @viz seed
                }
            }
        }
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!queue.isEmpty()) { // spread "safe" to every O connected to the border // @viz pop
            int[] cur = queue.poll(); // @viz pop
            for (int[] d : dirs) { // @viz spread
                int a = cur[0] + d[0], b = cur[1] + d[1]; // @viz spread
                if (a >= 0 && a < m && b >= 0 && b < n && board[a][b] == 'O') { // @viz spread
                    board[a][b] = 'S'; // mark when queued, so it's queued once // @viz spread
                    queue.add(new int[] {a, b}); // @viz spread
                }
            }
        }
        for (char[] row : board) { // @viz flip
            for (int c = 0; c < n; c++) { // @viz flip
                row[c] = row[c] == 'S' ? 'O' : 'X'; // O left over = trapped // @viz flip
            }
        }
    }
}
