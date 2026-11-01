import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    private List<Integer> path;
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        Arrays.sort(candidates); // sorted, so the loop can stop at the first one that's too big // @viz sort
        result = new ArrayList<>(); // @viz sort
        path = new ArrayList<>(); // @viz sort
        backtrack(candidates, 0, target); // @viz start
        return result; // @viz return
    }
    private void backtrack(int[] candidates, int start, int remaining) { // @viz call
        if (remaining == 0) { // path adds up to target // @viz done
            result.add(new ArrayList<>(path)); // @viz done
            return; // @viz done
        }
        for (int i = start; i < candidates.length; i++) { // only from start on: each combination is built in one order // @viz choose
            if (candidates[i] > remaining) break; // this one and every later one are too big // @viz prune
            path.add(candidates[i]); // @viz choose
            backtrack(candidates, i, remaining - candidates[i]); // i, not i + 1: the same number can be used again // @viz choose
            path.remove(path.size() - 1); // undo, so the next candidate can take its place // @viz undo
        }
    }
}
