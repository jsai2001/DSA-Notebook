import java.util.*;
class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(); // min-heap of the k biggest values seen so far // @viz init
        for (int x : nums) { // @viz push
            heap.add(x); // @viz push
            if (heap.size() > k) heap.poll(); // one too many: drop the smallest // @viz pop
        }
        return heap.peek(); // the smallest of the k biggest is the k-th biggest // @viz return
    }
}
