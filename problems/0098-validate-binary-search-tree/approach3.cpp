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
#include <climits>
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // long limits: a node can hold INT_MIN or INT_MAX itself, so the limits must go one past them.
        return check(root, LLONG_MIN, LLONG_MAX); // no limits at the root // @viz return
    }
private:
    bool check(TreeNode* node, long long low, long long high) { // every value here must be strictly between low and high // @viz call
        if (!node) return true; // an empty subtree breaks no rule // @viz empty
        if (node->val <= low || node->val >= high) return false; // @viz check, bad
        // Going left, this node's value becomes the new upper limit; going right, the new lower limit.
        return check(node->left, low, node->val) && check(node->right, node->val, high); // @viz recurse
    }
};
