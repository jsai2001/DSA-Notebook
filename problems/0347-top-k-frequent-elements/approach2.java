import java.util.*;
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>(); // value -> how many times it appears // @viz count
        for (int x : nums) count.merge(x, 1, Integer::sum); // @viz count
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b)); // least frequent on top // @viz push
        for (int x : count.keySet()) { // @viz push
            heap.add(x); // @viz push
            if (heap.size() > k) heap.poll(); // one too many: drop the least frequent // @viz pop
        }
        int[] ans = new int[k]; // @viz return
        for (int i = 0; i < k; i++) ans[i] = heap.poll(); // @viz return
        return ans; // @viz return
    }
}
