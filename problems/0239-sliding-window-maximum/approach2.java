import java.util.*;
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]); // (value, index): the biggest value is on top // @viz init
        int[] res = new int[nums.length - k + 1]; // @viz init
        for (int i = 0; i < nums.length; i++) { // @viz push
            heap.add(new int[] {nums[i], i}); // @viz push
            if (i >= k - 1) { // a full window ends at i // @viz drop
                while (heap.peek()[1] <= i - k) heap.poll(); // the top has slid out of the window: throw it away now // @viz drop
                res[i - k + 1] = heap.peek()[0]; // @viz top
            }
        }
        return res; // @viz return
    }
}
