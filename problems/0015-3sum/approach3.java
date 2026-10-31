import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); // @viz init
        List<List<Integer>> result = new ArrayList<>(); // @viz init
        int n = nums.length; // @viz init
        for (int i = 0; i + 2 < n; i++) { // @viz fix
            if (nums[i] > 0) break; // the smallest of the three is positive: no sum can be 0 // @viz stop
            if (i > 0 && nums[i] == nums[i - 1]) continue; // same first number as last time // @viz skip
            int lo = i + 1, hi = n - 1; // @viz fix
            while (lo < hi) { // @viz loop
                int total = nums[i] + nums[lo] + nums[hi]; // @viz sum
                if (total < 0) { // too small: a bigger middle number // @viz less
                    lo++; // @viz less
                } else if (total > 0) { // too big: a smaller last number // @viz more
                    hi--; // @viz more
                } else {
                    result.add(Arrays.asList(nums[i], nums[lo], nums[hi])); // @viz found
                    lo++; // @viz found
                    hi--; // @viz found
                    while (lo < hi && nums[lo] == nums[lo - 1]) lo++; // skip repeats of the middle number // @viz dedupe
                }
            }
        }
        return result; // @viz return
    }
}
