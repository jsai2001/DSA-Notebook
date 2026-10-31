import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); // sorted, so each triplet comes out in the same order // @viz init
        Set<List<Integer>> found = new HashSet<>(); // @viz init
        int n = nums.length;
        for (int i = 0; i < n; i++) { // @viz fix
            if (i > 0 && nums[i] == nums[i - 1]) continue; // same first number: same triplets // @viz skip
            Set<Integer> seen = new HashSet<>(); // values seen to the right of i so far // @viz fix
            for (int j = i + 1; j < n; j++) { // @viz scan
                int need = -nums[i] - nums[j]; // Two Sum on the rest: what pairs with nums[j]? // @viz need
                if (seen.contains(need)) { // @viz check
                    found.add(Arrays.asList(nums[i], need, nums[j])); // @viz found
                }
                seen.add(nums[j]); // @viz store
            }
        }
        return new ArrayList<>(found); // @viz return
    }
}
