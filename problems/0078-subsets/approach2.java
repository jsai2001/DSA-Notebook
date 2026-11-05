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
    private void backtrack(int[] nums, int start) { // path is a subset; extend it only with numbers after it // @viz call
        result.add(new ArrayList<>(path)); // every path is an answer, even the empty one // @viz record
        for (int i = start; i < nums.length; i++) { // @viz choose
            path.add(nums[i]); // @viz choose
            backtrack(nums, i + 1); // only later numbers next, so no subset repeats // @viz choose
            path.remove(path.size() - 1); // undo, so the next number can take this place // @viz undo
        }
    }
}
