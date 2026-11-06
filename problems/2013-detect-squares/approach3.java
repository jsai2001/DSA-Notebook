import java.util.ArrayList;
import java.util.List;
class DetectSquares {
    private final int[][] cnt = new int[1001][1001]; // cnt[x][y]: how many times (x, y) was added (coordinates are 0..1000)
    private final List<List<Integer>> col = new ArrayList<>(); // col.get(x): the distinct y's added in column x

    public DetectSquares() { // @viz init
        for (int x = 0; x <= 1000; x++) col.add(new ArrayList<>()); // @viz init
    }

    public void add(int[] point) {
        int x = point[0], y = point[1]; // @viz add
        if (cnt[x][y]++ == 0) col.get(x).add(y); // each y once per column // @viz add
    }

    public int count(int[] point) {
        int x = point[0], y = point[1]; // @viz count
        int total = 0; // @viz count
        for (int y2 : col.get(x)) { // a point straight above or below the query: one side of the square // @viz side
            if (y2 == y) continue; // same point: no side // @viz side
            int d = y2 - y; // the side length (with a sign) // @viz side
            for (int x2 : new int[] {x + d, x - d}) { // the square can be on the right or on the left // @viz corner
                if (x2 < 0 || x2 > 1000) continue; // off the grid: no points there // @viz corner
                total += cnt[x][y2] * cnt[x2][y] * cnt[x2][y2]; // @viz sum
            }
        }
        return total; // @viz return
    }
}
