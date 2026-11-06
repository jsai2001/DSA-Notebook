/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> levelOrder(TreeNode* root) {
        result.clear(); // result[d] = the values at depth d, left to right // @viz init
        dfs(root, 0); // @viz init
        return result; // @viz return
    }
private:
    std::vector<std::vector<int>> result;
    void dfs(TreeNode* node, size_t depth) { // @viz call
        if (!node) return; // @viz call
        if (depth == result.size()) result.push_back({}); // the first node seen at this depth // @viz new
        result[depth].push_back(node->val); // left is visited before right, so each level fills left to right // @viz add
        dfs(node->left, depth + 1); // @viz recurse
        dfs(node->right, depth + 1); // @viz recurse
    }
};
