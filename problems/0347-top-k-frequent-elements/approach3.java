import java.util.*;
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>(); // value -> how many times it appears // @viz count
        for (int x : nums) count.merge(x, 1, Integer::sum); // @viz count
        List<List<Integer>> bucket = new ArrayList<>(); // bucket[c] = values seen exactly c times // @viz bucket
        for (int c = 0; c <= nums.length; c++) bucket.add(new ArrayList<>()); // @viz bucket
        for (Map.Entry<Integer, Integer> e : count.entrySet()) bucket.get(e.getValue()).add(e.getKey()); // @viz bucket
        int[] ans = new int[k]; // @viz take
        int n = 0; // @viz take
        for (int c = nums.length; c > 0; c--) // biggest count first // @viz take
            for (int x : bucket.get(c)) { // @viz take
                ans[n++] = x; // @viz take
                if (n == k) return ans; // @viz return
            }
        return ans; // never reached: k is at most the number of distinct values // @viz return
    }
}
