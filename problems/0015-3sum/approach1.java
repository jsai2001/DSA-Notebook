import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length; // @viz init
        Set<List<Integer>> found = new HashSet<>(); // sorted triplets, so [-1, 0, 1] and [0, 1, -1] count once // @viz init
        for (int i = 0; i < n; i++) { // @viz pick
            for (int j = i + 1; j < n; j++) { // @viz pick
                for (int k = j + 1; k < n; k++) { // @viz pick
                    if (nums[i] + nums[j] + nums[k] == 0) { // @viz check
                        int[] t = {nums[i], nums[j], nums[k]}; // @viz found
                        Arrays.sort(t); // @viz found
                        found.add(Arrays.asList(t[0], t[1], t[2])); // @viz found
                    }
                }
            }
        }
        return new ArrayList<>(found); // @viz return
    }
}
