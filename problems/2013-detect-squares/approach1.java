import java.util.ArrayList;
import java.util.List;
class DetectSquares {
    private final List<int[]> points = new ArrayList<>(); // every added point, repeats included

    public DetectSquares() {} // @viz init

    public void add(int[] point) {
        points.add(new int[] {point[0], point[1]}); // @viz add
    }

    public int count(int[] point) {
        int x = point[0], y = point[1]; // @viz count
        int total = 0; // @viz count
        for (int[] p : points) { // try each stored point as the corner across from the query // @viz diag
            int px = p[0], py = p[1]; // @viz diag
            if (px == x || Math.abs(px - x) != Math.abs(py - y)) continue; // not a diagonal (or no area) // @viz diag
            // The other two corners are (x, py) and (px, y): count them by scanning again.
            int a = 0, b = 0; // @viz corner
            for (int[] q : points) { // @viz corner
                if (q[0] == x && q[1] == py) a++; // @viz corner
                if (q[0] == px && q[1] == y) b++; // @viz corner
            }
            total += a * b; // @viz sum
        }
        return total; // @viz return
    }
}
