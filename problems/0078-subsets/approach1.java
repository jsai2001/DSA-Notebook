import java.util.ArrayList;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    private List<Integer> path;
    public List<List<Integer>> subsets(int[] nums) {
        result = new ArrayList<>(); // @viz init
        path = new ArrayList<>(); // @viz init
        backtrack(nums, 0); // @viz init
        return result; // @viz return
    }
    private void backtrack(int[] nums, int i) { // decide nums[i], nums[i+1], ...; path = what's taken so far // @viz call
        if (i == nums.length) { // every number decided: path is one subset // @viz done
            result.add(new ArrayList<>(path)); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        path.add(nums[i]); // take nums[i] // @viz take
        backtrack(nums, i + 1); // @viz take
        path.remove(path.size() - 1); // undo, then leave nums[i] out // @viz skip
        backtrack(nums, i + 1); // @viz skip
    }
}
