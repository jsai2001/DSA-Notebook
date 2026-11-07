class Solution {
    public int numIslands(char[][] grid) {
        int count = 0; // @viz init
        for (int r = 0; r < grid.length; r++) // @viz cell
            for (int c = 0; c < grid[0].length; c++) // @viz cell
                if (grid[r][c] == '1') { // land not sunk yet: a new island // @viz cell
                    count++; // @viz count
                    sink(grid, r, c); // @viz count
                }
        return count; // @viz return
    }
    private void sink(char[][] grid, int r, int c) { // turn the whole island into water // @viz visit
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return; // off the grid, water, or already sunk // @viz stop
        grid[r][c] = '0'; // @viz sink
        sink(grid, r + 1, c); // @viz sink
        sink(grid, r - 1, c); // @viz sink
        sink(grid, r, c + 1); // @viz sink
        sink(grid, r, c - 1); // @viz sink
    }
}
