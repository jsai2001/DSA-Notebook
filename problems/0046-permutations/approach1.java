import java.util.ArrayList;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    private List<Integer> path;
    private boolean[] used;
    public List<List<Integer>> permute(int[] nums) {
        result = new ArrayList<>(); // @viz init
        path = new ArrayList<>(); // @viz init
        used = new boolean[nums.length]; // used[i]: nums[i] is already in path // @viz init
        backtrack(nums); // @viz init
        return result; // @viz return
    }
    private void backtrack(int[] nums) { // @viz call
        if (path.size() == nums.length) { // every number placed // @viz done
            result.add(new ArrayList<>(path)); // a copy: path keeps changing // @viz done
            return; // @viz done
        }
        for (int i = 0; i < nums.length; i++) { // try each number not used yet in the next position // @viz choose
            if (used[i]) continue; // @viz skip
            used[i] = true; // @viz choose
            path.add(nums[i]); // @viz choose
            backtrack(nums); // @viz choose
            path.remove(path.size() - 1); // undo, so the next number can take this position // @viz undo
            used[i] = false; // @viz undo
        }
    }
}
