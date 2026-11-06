import java.util.ArrayList;
import java.util.List;
class DetectSquares {
    private final int[][] cnt = new int[1001][1001]; // cnt[x][y]: how many times (x, y) was added (coordinates are 0..1000)
    private final List<int[]> distinct = new ArrayList<>();

    public DetectSquares() {} // @viz init

    public void add(int[] point) {
        int x = point[0], y = point[1]; // @viz add
        if (cnt[x][y]++ == 0) distinct.add(new int[] {x, y}); // remember each point once // @viz add
    }

    public int count(int[] point) {
        int x = point[0], y = point[1]; // @viz count
        int total = 0; // @viz count
        for (int[] p : distinct) { // each distinct stored point, as the corner across from the query // @viz diag
            int px = p[0], py = p[1]; // @viz diag
            if (px == x || Math.abs(px - x) != Math.abs(py - y)) continue; // not a diagonal (or no area) // @viz diag
            total += cnt[px][py] * cnt[x][py] * cnt[px][y]; // the other two corners; repeats multiply // @viz corner, sum
        }
        return total; // @viz return
    }
}
