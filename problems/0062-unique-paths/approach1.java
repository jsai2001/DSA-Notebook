class Solution {
    private int[][] memo;
    public int uniquePaths(int m, int n) {
        memo = new int[m][n]; // memo[r][c]: paths from the top-left corner to (r, c); 0 = not known yet // @viz init
        return paths(m - 1, n - 1); // @viz answer
    }
    private int paths(int r, int c) { // @viz call
        if (r == 0 || c == 0) return 1; // top row or left column: one way, a straight line // @viz edge
        if (memo[r][c] == 0) { // @viz memo
            memo[r][c] = paths(r - 1, c) + paths(r, c - 1); // arrive from above, or from the left // @viz add
        }
        return memo[r][c]; // @viz memo
    }
}
