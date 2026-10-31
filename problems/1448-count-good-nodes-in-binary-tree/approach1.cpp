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
#include <algorithm>
class Solution {
public:
    int goodNodes(TreeNode* root) {
        return dfs(root, root->val); // @viz start
    }
private:
    // best = largest value from the root down to node's parent
    int dfs(TreeNode* node, int best) { // @viz call
        if (!node) return 0; // @viz empty
        int count = node->val >= best ? 1 : 0; // good: nothing above it is bigger // @viz check
        best = std::max(best, node->val); // @viz update
        count += dfs(node->left, best); // @viz left
        count += dfs(node->right, best); // @viz right
        return count; // @viz done
    }
};
