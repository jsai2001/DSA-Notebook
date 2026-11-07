import java.util.*;
class Solution {
    public int[][] kClosest(int[][] points, int k) {
        int[][] order = points.clone(); // @viz sort
        Arrays.sort(order, (a, b) -> Integer.compare(a[0] * a[0] + a[1] * a[1], b[0] * b[0] + b[1] * b[1])); // squared distance: no sqrt needed // @viz sort
        return Arrays.copyOf(order, k); // @viz return
    }
}
