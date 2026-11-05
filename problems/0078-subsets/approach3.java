import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        int n = nums.length; // @viz init
        List<List<Integer>> result = new ArrayList<>(); // @viz init
        for (int mask = 0; mask < (1 << n); mask++) { // 2^n masks, one per subset // @viz mask
            List<Integer> subset = new ArrayList<>(); // @viz mask
            for (int i = 0; i < n; i++) // @viz bit
                if (((mask >> i) & 1) == 1) // bit i is 1: nums[i] is in this subset // @viz bit
                    subset.add(nums[i]); // @viz bit
            result.add(subset); // @viz add
        }
        return result; // @viz return
    }
}
