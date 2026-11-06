class Solution {
    private int[] parent;

    public void solve(char[][] board) {
        int m = board.length, n = board[0].length; // @viz init
        parent = new int[m * n + 1]; // cell r * n + c, plus one extra node: "the border" // @viz init
        for (int i = 0; i < parent.length; i++) parent[i] = i; // @viz init
        int BORDER = m * n; // @viz init
        for (int r = 0; r < m; r++) { // @viz loop
            for (int c = 0; c < n; c++) { // @viz loop
                if (board[r][c] != 'O') continue; // @viz loop
                if (r == 0 || r == m - 1 || c == 0 || c == n - 1) { // @viz border
                    union(r * n + c, BORDER); // @viz border
                }
                if (r + 1 < m && board[r + 1][c] == 'O') { // join with the O below // @viz join
                    union(r * n + c, (r + 1) * n + c); // @viz join
                }
                if (c + 1 < n && board[r][c + 1] == 'O') { // and the O to the right // @viz join
                    union(r * n + c, r * n + c + 1); // @viz join
                }
            }
        }
        int border = find(BORDER); // @viz flip
        for (int r = 0; r < m; r++) { // @viz flip
            for (int c = 0; c < n; c++) { // @viz flip
                if (board[r][c] == 'O' && find(r * n + c) != border) { // @viz flip
                    board[r][c] = 'X'; // not in the border's group: trapped // @viz flip
                }
            }
        }
    }

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving keeps the trees flat
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        parent[find(a)] = find(b);
    }
}
