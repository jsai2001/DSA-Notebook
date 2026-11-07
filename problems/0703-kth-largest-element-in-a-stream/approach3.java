import java.util.*;
class KthLargest {
    private final int k;
    private final PriorityQueue<Integer> heap = new PriorityQueue<>(); // min-heap of the k biggest values; its top is the k-th biggest // @viz init
    public KthLargest(int k, int[] nums) {
        this.k = k; // @viz init
        for (int x : nums) add(x); // @viz init
    }
    public int add(int val) {
        heap.add(val); // @viz add
        if (heap.size() > k) heap.poll(); // one too many: the smallest can't be in the top k // @viz pop
        return heap.peek(); // @viz answer
    }
}
