class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int best = 0; // @viz init
        for (int r = 0; r < grid.length; r++) // @viz cell
            for (int c = 0; c < grid[0].length; c++) // @viz cell
                if (grid[r][c] == 1) // land not sunk yet: a new island // @viz cell
                    best = Math.max(best, area(grid, r, c)); // @viz best
        return best; // @viz return
    }
    private int area(int[][] grid, int r, int c) { // land cells reached from (r, c) // @viz visit
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 0) // off the grid, water, or already sunk // @viz stop
            return 0; // @viz stop
        grid[r][c] = 0; // sink it, so it's never counted again // @viz sink
        return 1 + area(grid, r + 1, c) + area(grid, r - 1, c) + area(grid, r, c + 1) + area(grid, r, c - 1); // @viz sink
    }
}
