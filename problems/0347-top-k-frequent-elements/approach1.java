import java.util.*;
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>(); // value -> how many times it appears // @viz count
        for (int x : nums) count.merge(x, 1, Integer::sum); // @viz count
        List<Integer> order = new ArrayList<>(count.keySet()); // @viz sort
        order.sort((a, b) -> count.get(b) - count.get(a)); // most frequent first // @viz sort
        int[] ans = new int[k]; // @viz return
        for (int i = 0; i < k; i++) ans[i] = order.get(i); // @viz return
        return ans; // @viz return
    }
}
