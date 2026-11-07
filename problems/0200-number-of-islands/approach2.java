class Solution {
    private int[] parent;
    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]; // path halving
            x = parent[x];
        }
        return x;
    }
    public int numIslands(char[][] grid) {
        int R = grid.length, C = grid[0].length; // @viz init
        parent = new int[R * C]; // @viz init
        for (int i = 0; i < R * C; i++) parent[i] = i; // cell r * C + c starts as its own group // @viz init
        int count = 0; // @viz init
        for (char[] row : grid) for (char ch : row) if (ch == '1') count++; // every land cell starts as its own island // @viz init
        for (int r = 0; r < R; r++) { // @viz cell
            for (int c = 0; c < C; c++) { // @viz cell
                if (grid[r][c] != '1') continue; // @viz cell
                int[][] nb = {{r + 1, c}, {r, c + 1}}; // down and right are enough: each pair is met once // @viz pair
                for (int[] p : nb) { // @viz pair
                    if (p[0] < R && p[1] < C && grid[p[0]][p[1]] == '1') { // @viz pair
                        int a = find(r * C + c), b = find(p[0] * C + p[1]); // @viz pair
                        if (a != b) { // two separate islands touch: they are one // @viz join
                            parent[a] = b; // @viz join
                            count--; // @viz join
                        }
                    }
                }
            }
        }
        return count; // @viz return
    }
}
