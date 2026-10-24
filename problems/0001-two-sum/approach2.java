import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>(); // {value: index} // @viz init
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i]; // @viz complement
            if (seen.containsKey(complement)) { // @viz check
                return new int[] { seen.get(complement), i }; // @viz found
            }
            seen.put(nums[i], i); // @viz store
        }
        return new int[0]; // @viz notfound
    }
}
