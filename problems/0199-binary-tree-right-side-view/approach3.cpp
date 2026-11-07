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
    std::vector<int> rightSideView(TreeNode* root) {
        std::vector<int> res; // res[d] = the first value seen at depth d // @viz init
        dfs(root, 0, res); // @viz init
        return res; // @viz return
    }
private:
    void dfs(TreeNode* node, int depth, std::vector<int>& res) { // @viz call
        if (!node) return; // @viz call
        if (depth == (int)res.size()) res.push_back(node->val); // first visit to this depth: right first, so it's the rightmost // @viz first
        dfs(node->right, depth + 1, res); // right before left // @viz right
        dfs(node->left, depth + 1, res); // @viz left
    }
};
