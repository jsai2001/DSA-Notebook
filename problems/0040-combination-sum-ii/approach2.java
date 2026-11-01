import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    private List<Integer> path;
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates); // equal values sit next to each other // @viz sort
        result = new ArrayList<>(); // @viz sort
        path = new ArrayList<>(); // @viz sort
        backtrack(candidates, 0, target); // @viz start
        return result; // @viz return
    }
    private void backtrack(int[] candidates, int start, int remaining) { // @viz call
        if (remaining == 0) { // @viz done
            result.add(new ArrayList<>(path)); // @viz done
            return; // @viz done
        }
        for (int i = start; i < candidates.length; i++) { // @viz choose
            if (i > start && candidates[i] == candidates[i - 1]) continue; // same value as the one just tried here // @viz same
            if (candidates[i] > remaining) break; // this one and every later one are too big // @viz prune
            path.add(candidates[i]); // @viz choose
            backtrack(candidates, i + 1, remaining - candidates[i]); // i + 1: each number is used at most once // @viz choose
            path.remove(path.size() - 1); // @viz undo
        }
    }
}
