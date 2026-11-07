import java.util.*;
class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(b[0] * b[0] + b[1] * b[1], a[0] * a[0] + a[1] * a[1])); // farthest on top // @viz init
        for (int[] p : points) { // @viz push
            heap.add(p); // @viz push
            if (heap.size() > k) heap.poll(); // one too many: drop the farthest // @viz pop
        }
        return heap.toArray(new int[0][]); // @viz return
    }
}
