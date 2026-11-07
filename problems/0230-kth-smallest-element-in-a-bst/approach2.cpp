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
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        left = k; // how many values are still to be counted // @viz init
        inorder(root); // @viz init
        return ans; // @viz return
    }
private:
    int left = 0, ans = -1;
    bool done = false;
    void inorder(TreeNode* node) { // @viz visit
        if (!node || done) return; // nothing here, or already found: stop // @viz stop
        inorder(node->left); // @viz visit
        if (done) return; // @viz stop
        if (--left == 0) { // this node is the next smallest // @viz count, found
            ans = node->val; // @viz found
            done = true; // @viz found
            return; // @viz found
        }
        inorder(node->right); // @viz visit
    }
};
